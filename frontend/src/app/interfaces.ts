export interface FullUserDto {
  id: number;
  profile: ProfileDto;
  isAdmin: boolean;
  active: boolean;
  status: string;
  companies: CompanyDto[];
  teams: TeamDto[];
}

export interface ProfileDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface CompanyDto {
  id: number;
  name: string;
  description: string;
  teams: TeamDto[];
  users: BasicUserDto[];
}

export interface TeamDto {
  id: number;
  name: string;
  description: string;
  teammates: BasicUserDto[];
}

export interface BasicUserDto {
  id: number;
  profile: ProfileDto;
  isAdmin: boolean;
  active: boolean;
  status: string;
}

export interface AnnouncementDto {
  id: number;
  date: string;
  title: string;
  message: string;
  author: BasicUserDto;
}

export interface ProjectDto {
  id: number;
  name: string;
  description: string;
  active: boolean;
  team: TeamDto;
}
