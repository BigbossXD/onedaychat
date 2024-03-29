import JoyseImage from "../assets/userImage/Joyse.png";
import RussellImage from "../assets/userImage/Russell.png";
import SamImage from "../assets/userImage/Sam.png";

export const GRAPHQL_URL: string =
  "https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql";

export const USERS = [
  { userId: "Joyse", avatar: JoyseImage },
  { userId: "Russell", avatar: RussellImage },
  { userId: "Sam", avatar: SamImage },
];

export const CHANNELS = [
  {
    channelId: "1",
    name: "General",
  },
  { channelId: "2", name: "LGTM" },
  { channelId: "3", name: "Technology" },
];
