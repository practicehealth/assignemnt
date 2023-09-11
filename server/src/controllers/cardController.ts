import { Request, Response } from 'express';
import Card, { CardDocument } from '../models/card'; // Assuming CardModel has a TypeScript definition file
import { iconObj } from '../assets/icons';

interface CardTypeData {
  [key: string]: {
    cards: CardDocument[];
    iconUrl: string;
  };
}
export const getCards = async (req: Request, res: Response): Promise<void> => {
  try {
    // Access authenticated user data if needed (req.user)
    // Retrieve all cards data from the database
    const cardsData = await Card.find();

    // Organize card data by resourceType
    const cardTypeData: CardTypeData = {};
    cardsData.forEach((card) => {
      if (!cardTypeData[card.resourceType]) {
        cardTypeData[card.resourceType] = {
          cards: [],
          iconUrl: iconObj[card.resourceType], // Assign the icon URL
        };
      }
      cardTypeData[card.resourceType].cards.push(card);
    });

    // Send distinct cardTypes to the frontend
    res.status(200).json(cardTypeData);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createCard = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    message: "Future Implementation",
  });
};

export const updateCard = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    message: "Future Implementation",
  });
};

export const deleteCard = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    message: "Future Implementation",
  });
};
