import { Request, Response } from 'express';
import Event, { EventDocument } from '../models/event'; // Assuming EventModel has a TypeScript definition file

// Get all events
export const getEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    // Access authenticated user data if needed (req.user)
    // Retrieve all events data from the database
    const events = await Event.find().sort({ serviceDate: 'descending' });

    const distinctYears = await Event.distinct('year');
    const distinctEventType = await Event.distinct('eventType');
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
    const formattedEvents = events.map((event: EventDocument) => {
      const myDate = new Date(event.serviceDate);
      const day = dayNames[myDate.getDay()];
      const date = myDate.getDate();
      const month = monthNames[myDate.getMonth()];
      return {
        id: event.id,
        year: event.year,
        eventHeader: event.eventHeader,
        provider: event.provider,
        facility: event.facility,
        eventType: event.eventType,
        references: event.references,
        reference: event.reference,
        serviceDate: event.serviceDate,
        day,
        date,
        month,
        resourceType: event.resourceType,
        cost: event.cost !== undefined ? event.cost : 'n/a',
      };
    });

    res.status(200).json({
      formattedEvents,
      distinctYears,
      distinctEventType,
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new event
export const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    // Access authenticated user data if needed (req.user)
    // Create a new event based on the Request data
    res.status(200).json({
      message: 'Future Implementation',
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update an event
export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    // Access authenticated user data if needed (req.user)
    const eventId = req.params?.eventId;

    // Update the event in the database based on the Request data
    res.status(200).json({
      message: 'Future Implementation',
    });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete an event
export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    // Access authenticated user data if needed (req.user)
    const eventId = req.params?.eventId;

    // Find and delete the event from the database
    res.status(200).json({
      message: 'Future Implementation',
    });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
