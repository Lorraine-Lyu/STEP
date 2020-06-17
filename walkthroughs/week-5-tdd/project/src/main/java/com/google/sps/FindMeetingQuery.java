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

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.PriorityQueue;
import java.util.Set;

/**
 * The class that performs the meeting schedule query to find all possible time for 
 * a future meeting.
 */
public final class FindMeetingQuery {
    
  /**
   * Finds all availble time ranges for the new meeting.
   * @param events A list of events potentially need to be considereded when scheduling the new meeting.
   * @param request The MeetingRequest with information about the new meeting to be scheduled.
   * @return A collection of TimeRanges available for the new meeting.
   */
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    
    List<TimeRange> availableTimeRanges = new ArrayList();

    // Delete unrelated events and sort the list by start time.
    List<Event> sortedEvents = trimAndSortEventList(events, new HashSet<String>(request.getAttendees()));
    // Put a dummy event at the tail of the sorted list in order to make algorithm include the 
    // latestest time range of a day.
    Event lastestEmptyEvent = 
        new Event("", TimeRange.fromStartDuration(TimeRange.END_OF_DAY + 1, 0), request.getAttendees());
    sortedEvents.add(sortedEvents.size(), lastestEmptyEvent);
    
    // During the loop, this heap stores the end times of all events that has not ended.
    PriorityQueue<Integer> endTimes = new PriorityQueue();
    // During the loop, this variable marks the latest endtime of all ended events.
    int lastEndTime = TimeRange.START_OF_DAY;
    endTimes.add(lastEndTime);

    for (Event event : sortedEvents) {
      int startTime = event.getWhen().start();
      // Pop all the event end time that is earlier than the current event's start time.
      while (!endTimes.isEmpty() && endTimes.peek() <= startTime) {
        lastEndTime = endTimes.poll();
      }
      // If all previous events have ended and the free time is longer than or equal to required time,
      // add a new TimeRange to the return list.
      if (endTimes.isEmpty() && startTime - lastEndTime >= request.getDuration()) {
        availableTimeRanges.add(TimeRange.fromStartDuration(lastEndTime, startTime - lastEndTime));
      }
      endTimes.add(event.getWhen().end());
    }

    return availableTimeRanges;
  }

  /** 
   * Check all events and return only the events that share attendees with the new meeting.
   * The returned events list is sorted by start time.
   * @param events A collection of events 
   * @param attendees A list of people, represented by string, who will attend the new meeting.
   * @return A list of events sorted by start time.
   */
  private List<Event> trimAndSortEventList(Collection<Event> events, Set<String> attendees) {

    List<Event> trimmedEventList = new ArrayList<>();

    for (Iterator<Event> eventIterator = events.iterator(); eventIterator.hasNext();) {
      Event event = eventIterator.next();   
      // This loop validates whether each event needs to be consider.
      // If one event doesn't contain any required attendee, it won't be added to the new event list.
      for (String people : event.getAttendees()) {
        if (attendees.contains(people)) {
          trimmedEventList.add(event);
          break;
        }
      }
    }

    trimmedEventList.sort((e1, e2) -> TimeRange.ORDER_BY_START.compare(e1.getWhen(), e2.getWhen()));
    return trimmedEventList; 
  }
}
