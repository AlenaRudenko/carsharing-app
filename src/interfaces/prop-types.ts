import { TPath } from "../pages/main-page/MainContent";
import { TEvent } from "./event";

export interface OrderProps {
  localCity: string;
  handleLocalStoreCity?: (city: string | undefined) => void;
  confirmedOrderPaths: TPath[];
  handleConfirmedOrderPaths: (path: TPath) => void;
  handleChangeStartPicker: (time: TEvent) => void;
  handleChangeEndPicker: (time: TEvent) => void;
  handleResetStartPicker: () => void;
  handleResetEndPicker: () => void;
  startsAt: string;
  endsAt: string;
}
