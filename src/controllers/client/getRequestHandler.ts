import { Request, Response } from "express";
import { MatkaData, MatkaPattiTips, Tips } from "../../schema/MongoSchema";

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
      .sort({ createdAt: 1 })
      .limit(30); // Fetch only the last ten records

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

// get patti tips

export const getPattiTips = async (req: Request, res: Response) => {
  // Get the current date from the request parameters
  const currentDate: string = req.params.date;

  try {
    // Fetch the last ten records excluding the current day
    const tipsData = await MatkaPattiTips.findOne({ date: currentDate });

    return res.status(200).json(tipsData);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while finding the data", error });
  }
};

// generate Tips

export const GeneratedData = async (req: Request, res: Response) => {
  // Get the current date from the request parameters
  const currentDate: string = req.params.date;

  try {
    // Fetch the last ten records excluding the current day
    const lastTen = await MatkaData.find({ date: { $ne: currentDate } })
      .sort({ createdAt: -1 })
      .limit(6); // Fetch only the last ten records

    const originalArray: any = lastTen;

    const newArray: number[][] = originalArray.map((entry: any) => {
      const innerArray: number[] = Array(8).fill(null);

      entry.data.forEach((gameData: any) => {
        if (gameData.index < 8) {
          innerArray[gameData.index] = gameData.gameNumber;
        }
      });

      return innerArray;
    });

    const historicalData: (number | null)[][] = newArray;

    const predictHighestProbabilityBalls = (
      data: (number | null)[][]
    ): number[] | string => {
      const allBalls: (number | null)[] = data
        .flat()
        .filter((ball) => ball !== null);

      // Check if there are any non-closed slots
      if (allBalls.length === 0) {
        return "All closed or missing";
      }

      const ballCounter: Record<number, number> = {};
      allBalls.forEach((ball) => {
        if (ball !== null) {
          ballCounter[ball] = (ballCounter[ball] || 0) + 1;
        }
      });

      const sortedBalls = Object.entries(ballCounter).sort(
        (a, b) => b[1] - a[1]
      );

      console.log(sortedBalls);
      const mostCommonBalls = sortedBalls.slice(0, 3);

      const predictedBalls: number[] = mostCommonBalls.map(([ball]) =>
        parseInt(ball, 10)
      );
      return predictedBalls;
    };

    // Example usage
    const result = predictHighestProbabilityBalls(historicalData);

    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while finding the data", error });
  }
};
