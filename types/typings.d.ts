interface IDataObject {
  gameResultPatti: number;
  gameNumber: number;
  index: number;
}

interface TipsInterface {
  index: number;
  tip: string;
}

interface TokenVerifyType {
  email: string;
  iat: number;
  exp: number;
}

interface GameData {
  index: number;
  gameResultPatti: number;
  gameNumber: number;
  _id?: string;
}

interface GameEntry {
  _id: string;
  date: string;
  data: GameData[];
  createdAt?: string;
  __v: number;
}
