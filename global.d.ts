declare global {
  interface UserData {
    id: string;
    username: string;
    avatar?: string | null;
    cover?: string | null;
    name?: string | null;
    surname?: string | null;
    description?: string | null;
    city?: string | null;
    school?: string | null;
    work?: string | null;
    website?: string | null;
    createdAt: Date;
    posts?: any[];
    comments?: any[];
    likes?: any[];
    follower?: any[];
    following?: any[];
    followRequestSend?: any[];
    followRequestReceive?: any[];
    blocks?: any[];
    blockedBy?: any[];
    stories?: any[];
    _count?: { follower?: number; following?: number; posts?: number };
  };
}
export default global