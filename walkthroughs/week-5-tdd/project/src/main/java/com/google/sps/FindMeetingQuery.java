// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
 
package com.google.sps;
 
import com.google.common.collect.BiMap;
import com.google.common.collect.HashBiMap;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Set;
import javafx.util.Pair;
 
// HOW IT WORKS (to find the greatest number to attend) :
// 1. Find all time ranges when all required attendees are available.
// 2. Find all time ranges when only optional attendees are available, 
// record number of absent people with a wrapper class.
// 3. Project all start and end times to an array and get # of absent people for all time ranges
// result from 1 : |[---------------]xxxxxx[--------]xxx[--------]xxxxx|
// result from 2 : |[  1  ]    [  2    ]      [1]       [  2[1]  ]     | digits mean
// number of absent people.
// result from 3 : |[  1  ][ 0 ][ 2 ][xxxxx][0][1][0]xxx[ 2][3][2]xxxxx|
// Then find the intervals with max value as small as possible, check indexToTime map to see if 
// the duration is long enough.
// NOTE: The size of array for step 3 is 2*events. 
// NOTE: Use maps to store the mapping between time and array index
 
/**
 * The class that performs the meeting schedule query to find all possible time for 
 * a future meeting.
 */
public final class FindMeetingQuery {
    
  /**
   * Finds all availble time ranges for the new meeting.
   * @param events A list of events potentially need to be considereded when scheduling the meeting.
   * @param request The MeetingRequest with information about the new meeting to be scheduled.
   * @return A collection of TimeRanges available for the new meeting.
   */
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    // Filter out unrelated events and put timeranges of 
    // events with required attendees, events only with optional attendees in separate list.
    Pair<List<TimeRange>, List<Event>> allRelevantTimes = 
        trimAndSortEventList(events, 
            new HashSet<String>(request.getAttendees()), new HashSet(request.getOptionalAttendees()));
    List<TimeRange> requiredTimeRanges = allRelevantTimes.getKey();
    List<Event> optionalEvents = allRelevantTimes.getValue();
 
    // Get all time ranges when all required attendees are free.
    List<TimeRange> availableTimeRanges = ScheduleForRequiredAttendees(requiredTimeRanges, request);
    if (request.getOptionalAttendees().isEmpty()) {
      return availableTimeRanges;
    }
 
    // Calculate all time fragments where number of people absent stay the same;
    // map each time fragment to an array index.
    BiMap<Integer, Integer> timeToIndex = 
        constructTimeStampMap(availableTimeRanges, optionalEvents);
    int[] absenceRecords = new int[timeToIndex.size()];
    Pair<Integer, Integer> absenceBounds = 
        markAbsenceNumber(absenceRecords, timeToIndex, availableTimeRanges, optionalEvents);
    int fewestAbsence = absenceBounds.getKey();
    int maxAbsence = absenceBounds.getValue();
 
    // Start from checking time fragments with fewest absence, if find suitable time range, return. 
    List<TimeRange> toReturn = 
        getOptimalTimeRanges(fewestAbsence++, absenceRecords, timeToIndex.inverse(), request.getDuration());
    while (toReturn.isEmpty() 
        && request.getOptionalAttendees().size() > fewestAbsence + 1 && fewestAbsence <= maxAbsence) {
      toReturn = 
          getOptimalTimeRanges(fewestAbsence++, absenceRecords, timeToIndex.inverse(), request.getDuration());
    }
    if (fewestAbsence == request.getAttendees().size() + request.getOptionalAttendees().size()) {
      return new ArrayList();
    }
    return toReturn.isEmpty() ? availableTimeRanges :toReturn;
  }
 
  /**
   * Calculates the all time ranges that allows required attendees to join.
   * @param requiredTimeRanges All events that have required attendees.
   * @param request            The meeting request.
   * @return All the TimeRanges that required attendees are free to join.
   */
  public List<TimeRange> ScheduleForRequiredAttendees(
      List<TimeRange> requiredTimeRanges, MeetingRequest request) {
 
    List<TimeRange> availableTimeRanges = new ArrayList();
    // Put a dummy event at the tail of the sorted list in order to make algorithm include the 
    // latestest time range of a day.
    TimeRange lastestEmptyTimeRange = TimeRange.fromStartDuration(TimeRange.END_OF_DAY + 1, 0);
    requiredTimeRanges.add(requiredTimeRanges.size(), lastestEmptyTimeRange);
    
    // During the loop, this heap stores the end times of all events that has not ended.
    PriorityQueue<Integer> endTimes = new PriorityQueue();
    // During the loop, this variable marks the latest endtime of all ended events.
    int lastEndTime = TimeRange.START_OF_DAY;
    endTimes.add(lastEndTime);
 
    for (TimeRange time : requiredTimeRanges) {
      int startTime = time.start();
      while (!endTimes.isEmpty() && endTimes.peek() <= startTime) {
        lastEndTime = endTimes.poll();
      }
      // If all previous events have ended and the free time is longer than or equal to required time,
      // add a new TimeRange to the return list.
      if (endTimes.isEmpty() && startTime - lastEndTime >= request.getDuration()) {
        availableTimeRanges.add(TimeRange.fromStartDuration(lastEndTime, startTime - lastEndTime));
      }
      endTimes.add(time.end());
    }
    return availableTimeRanges;
  }
 
  /** 
   * Leaves only related events and stores events with only optional attendees in separate list.
   * @param events     A collection of events.
   * @param attendees  A set of people, represented by string, who will attend the new meeting.
   * @param optionalAttendees A set of optional attendees.
   * @return A list of events with required attendees and a list of events with only required 
   * attendees attending.
   */
  private Pair<List<TimeRange>, List<Event>> trimAndSortEventList(
      Collection<Event> events, Set<String> attendees, Set<String> optionalAttendees) {
 
    List<TimeRange> trimmedEventList = new ArrayList();
    List<Event> optionalEvents = new ArrayList();
    boolean noAttendees = true;
    Set<String> optionalAttendeesCounts;
 
    for (Iterator<Event> eventIterator = events.iterator(); eventIterator.hasNext();) {
      Event event = eventIterator.next();   
      noAttendees = true;
      optionalAttendees = new HashSet<String>();
      // This loop validates whether each event needs to be consider.
      // If one event doesn't contain any required attendee, it won't be added to the new event list.
      for (String people : event.getAttendees()) {
        if (attendees.contains(people)) {
          trimmedEventList.add(event.getWhen());
          noAttendees = false;
          break;
        } else if (optionalAttendees.contains(people)) {
          optionalAttendees.add(people);
        }
      }
      if (noAttendees && optionalAttendees.size() > 0) {
        optionalEvents.add(new Event(event.getTitle(), event.getWhen(), optionalAttendees));
      }
    }
 
    trimmedEventList.sort((t1, t2) -> TimeRange.ORDER_BY_START.compare(t1, t2));
    optionalEvents.sort((r1, r2) -> TimeRange.ORDER_BY_START.compare(r1.getWhen(), r2.getWhen()));
    return new Pair(trimmedEventList, optionalEvents); 
  }
 
  /** 
   * Finds all the start and end times need to consider, sort them and map them to array indexes.
   * @param availableTimes The TimeRanges all required attendees are available.
   * @param optionalUnavailableTimes The TimesRanges some optional attendees are not available.
   * @return A map from each time mark(in minutes) to unique array index.
   */
  private BiMap<Integer, Integer> constructTimeStampMap(List<TimeRange> availableTimes, 
                                                        List<Event> optionalEvents) {
    Set<Integer> appearedTimes = new HashSet();
    for (TimeRange time : availableTimes) {
      appearedTimes.add(time.start());
      appearedTimes.add(time.end());
    }
    for (Event event : optionalEvents) {
      appearedTimes.add(event.getWhen().start());
      appearedTimes.add(event.getWhen().end());
    }
    PriorityQueue<Integer> allTimeStamps = new PriorityQueue(appearedTimes);
    BiMap<Integer, Integer> timeToIndex = HashBiMap.create();
    int index = 0;
    while (!allTimeStamps.isEmpty()) {
      timeToIndex.put(allTimeStamps.poll(), index);
      index++;
    }
    return timeToIndex;
  }
 
  /** Given an empty array, change all values inside to represent the number of people absent
   *  in each time range fragment.
   * @param records The empty integer array with length equal to number of all start and end times.
   * @param timeToIndex The map from each time mark(in minutes) to array index.
   * @param availableTimes The TimeRanges all required attendees are available.
   * @param optionalUnavailableTime The TimesRanges some optional attendees are not available.
   */
  private Pair<Integer, Integer> markAbsenceNumber(int[] records, Map<Integer, Integer> timeToIndex, 
                                                   List<TimeRange> availableTimes, List<Event> optionalEvents) {
    Set<String>[] absentNameList = new Set[records.length];
    for (int i = 0; i < absentNameList.length; i++) {
      absentNameList[i] = new HashSet<String>();
    }
    int fewestAbsence = Integer.MAX_VALUE;
    int maxAbsence = 0;
    for (TimeRange time : availableTimes) {
      for (int i = timeToIndex.get(time.start()); i < timeToIndex.get(time.end()); i++) {
        records[i] = 0;
      }
    }
 
    for (Event event : optionalEvents) {
      for (int j = timeToIndex.get(event.getWhen().start()); 
           j < timeToIndex.get(event.getWhen().end()); j++) {
        if (records[j] != Integer.MAX_VALUE) {
          absentNameList[j].addAll(event.getAttendees());
          records[j] = absentNameList[j].size();
        }
      }
    }
 
    records[records.length - 1] = Integer.MAX_VALUE;
 
    for (int absentPpl : records) {
      if (absentPpl < fewestAbsence) {
        fewestAbsence = absentPpl;
      }
      if (absentPpl > maxAbsence && absentPpl != Integer.MAX_VALUE) {
        maxAbsence = absentPpl;
      }
    }
    return new Pair(fewestAbsence, maxAbsence);
  }
 
  /** 
   *  Gets all the TimeRanges that most people can join.
   *  @param fewestAbsence The number of people being absent allowed.
   *  @param records The int array recording number of people being absent in each time fragment.
   *  @param indexToTime The map converting index in array into time in a day.
   *  @param duration The requested duration for the new meeting.
   */
  private List<TimeRange> getOptimalTimeRanges(int fewestAbsence, int[] records, 
                                               BiMap<Integer, Integer> indexToTime, long duration) {
    int start = 0;
    int end = 0;
    int index = 0;
    boolean counting = false;
    List<TimeRange> finalList = new ArrayList();
    while (index < records.length) {
      if (records[index] <= fewestAbsence && !counting) {
        start = indexToTime.get(index);
        counting = true;
      } else if ((records[index] > fewestAbsence) && counting) {
        end = indexToTime.get(index);
        counting = false;
        if (end - start >= duration) { 
          finalList.add(TimeRange.fromStartEnd(start, end, false));
        }
      }
      index++;
    }
    return finalList;
  }
}
