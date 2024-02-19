export type Project = {
  Id: string;
  UserId: string;
  Title: string;
  Width?: number;
  Height?: number;
  Unit?: string;
  Resolution?: Record<string, string>;
  ColorMode?: Record<string, string>;
  ColorProfile?: string;
  PixelAspectRatio?: string;
  BackgroundContent?: string;
  CreatedAt?: string;
  ModifiedAt?: string;
  Zoom?: number;
};

export type ProjectPreset = {
  Title: string;
  Width: number;
  Height: number;
  Unit: string;
  Resolution: Record<string, string>;
  ColorMode: Record<string, string>;
  ColorProfile: string;
  PixelAspectRatio: string;
  BackgroundContent: string;
};
