import HistoryStack from "../navigation/HistoryStack/history.stack";
import HomeStack from "../navigation/HomeStack/home.stack";
import ProfileStack from "../navigation/ProfileStack/profile.stack";

export const tabs = [
  {
    name: "Главная",
    component: HomeStack,
    icon: "home",
  },
  {
    name: "История",
    component: HistoryStack,
    icon: "clock",
  },
  {
    name: "Профиль",
    component: ProfileStack,
    icon: "user",
  },
];
