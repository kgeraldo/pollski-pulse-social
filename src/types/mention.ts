
export interface MentionUser {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  isVerified?: boolean;
}

export interface Mention {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  startIndex: number;
  endIndex: number;
}

export interface MentionSuggestion extends MentionUser {
  relevanceScore?: number;
}
