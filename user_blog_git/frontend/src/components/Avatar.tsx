import React from 'react';

interface AvatarProps {
  avatarUrl?: string;
  userName?: string;
  size?: number; // for customizing width/height if desired
}

const Avatar: React.FC<AvatarProps> = ({ avatarUrl, userName, size = 40 }) => {
  // You can define a default if `avatarUrl` is null/undefined
  const defaultAvatar = 'https://via.placeholder.com/150'; 
  const displayAvatar = avatarUrl || defaultAvatar;

  return (
    <img
      src={displayAvatar}
      alt={userName ? `${userName}'s avatar` : 'User avatar'}
      className="rounded-full object-cover"
      style={{
        width: size,
        height: size,
      }}
    />
  );
};

export default Avatar;
