export class Conge {
  
        constructor(
          public id: number,
          public user: { id: number } ,
          public typeConge: string, 
          public dateDebut: string, 
          public dateFin: string, 
          public status: string 
        ) {}
      }
