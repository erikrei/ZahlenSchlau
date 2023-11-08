export type TSidebarLink = {
  linkId: number;
  name: string;
  icon: JSX.Element;
};

export type TLinkContext = {
  activeLink: string;
  setActiveLink: React.Dispatch<React.SetStateAction<string>>;
};

export type TLinkInformation = {
  name: string;
  description: string;
};

export type TCardInformation = {
  id: number;
  operation: string;
  img: {
    path: string;
    alt: string;
  };
  routerPath: string;
};

export type TExerciseData = {
  _id: string;
  numberOne: number;
  numberTwo: number;
  result: number;
  operation: string;
};

export type TClickedExercise = Omit<TExerciseData, "operation"> & {
  answer: number;
};

export type TCreatedExercise = {
  _id: string,
  numberOne: number;
  numberTwo: number;
  operation: string;
};

export type TSidebarDescription = {
  operation: string;
  description: string;
};