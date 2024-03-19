import { Request, Response } from "express";
import { MatkaData, Tips } from "../../schema/MongoSchema";

// current day's results

export const getCurrentDayResults = async (req: Request, res: Response) => {
  // get the date from param

  const date: string = req.params.date;

  try {
    let data = await MatkaData.findOne({ date });

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Server error", error });
  }
};

// last two day's results

export const lastTwoDays = async (req: Request, res: Response) => {
  // get the date from param

  const currentDate: string = req.params.date;

  try {
    // Fetch the last ten records excluding the current day
    const lastTen = await MatkaData.find({ date: { $ne: currentDate } })
      .sort({ createdAt: -1 })
      .limit(2); // Fetch only the last two records

    return res.status(200).json(lastTen);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while finding the data", error });
  }
};

// last ten day's results

export const lastTenDays = async (req: Request, res: Response) => {
  // Get the current date from the request parameters
  const currentDate: string = req.params.date;

  try {
    // Fetch the last ten records excluding the current day
    const lastTen = await MatkaData.find({ date: { $ne: currentDate } })
      .sort({ createdAt: -1 })
      .limit(10); // Fetch only the last ten records

    return res.status(200).json(lastTen);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while finding the data", error });
  }
};

// all previous results

export const previousData = async (req: Request, res: Response) => {
  // Get the current date from the request parameters
  const currentDate: string = req.params.date;

  console.log(currentDate);

  try {
    // Fetch the last ten records excluding the current day
    const lastTen = await MatkaData.find({ date: { $ne: currentDate } }).sort({
      createdAt: -1,
    });

    return res.status(200).json(lastTen);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while finding the data", error });
  }
};

// get tips

export const getTipsData = async (req: Request, res: Response) => {
  // Get the current date from the request parameters
  const currentDate: string = req.params.date;

  try {
    // Fetch the last ten records excluding the current day
    const tipsData = await Tips.findOne({ date: currentDate });

    return res.status(200).json(tipsData);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while finding the data", error });
  }
};
