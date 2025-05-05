export interface ChatCardType {
  id: number; 
  profilePic: string;
  name: string;
  lastText: string;
  lastSeen: string;
  selected: boolean;
  messageCategoryId: number;
}