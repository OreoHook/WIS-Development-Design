export interface IProfessor {
  _id: string;
  department: string;
  position: string;
  academicDegree: string;
  fullName: string;
  dateOfBirth: Date;
  sex: string;
  passport: string;
  isCompleted: boolean;
}

export interface IProfessorDto {
  department: string;
  position: string;
  academicDegree: string;
  fullName: string;
  dateOfBirth: Date;
  sex: string;
  passport: string;
}
