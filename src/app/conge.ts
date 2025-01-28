export class Conge {
  
        constructor(
          public id: number,
          public EmployeeId: number,
          public typeConge: string, 
          public dateDebut: string, 
          public dateFin: string, 
          public statut: string = 'En attente de validation' 
        ) {}
      }
