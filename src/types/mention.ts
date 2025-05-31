
export interface MentionSuggestion {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  isVerified?: boolean;
  isOnline?: boolean;
}

export interface MentionMatch {
  start: number;
  end: number;
  username: string;
}
