// employee.model.ts
export class Employee {
  constructor(
    public id: number | null = null,
    public firstName: string = '',
    public lastName: string = '',
    public email: string = '',
    public position: string = '',
    public phoneNumber: string = '',
    public salary: number = 0,
    public hireDate: string = '',
    public password: string = '',
    public username: string = '',
    public photo: string = '',
    public role: string = ''
  ) {}
}
