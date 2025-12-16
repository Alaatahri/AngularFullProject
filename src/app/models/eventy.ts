export interface Event {  // ← S'assurer que c'est bien "Event" et pas "Eventy"
  id: number;              
  title: string;          
  description: string;     
  date: Date;              
  location: string;            
  price: number;            
  organizerId: number; 
  imageUrl: string;       
  nbPlaces: number;        
  nbrLike: number;         
}