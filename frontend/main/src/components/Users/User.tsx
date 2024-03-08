import React, { useEffect, useState, useRef } from 'react';
import UserService, { UserData, EmojiChange } from '../../services/UsersService';
import { useAuth } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import './User.scss'; // Import your SCSS file

// Dummy emoji data
const emojis: string[] = ['😀', '😎', '😍', '🚀', '🎉', '🌟', '🍕'];

const UserProfile: React.FC = () => {
  const { usernameLink } = useParams<{ usernameLink: string }>();
  const { username, authTokens, logoutUser } = useAuth();
  const [user, setUser] = useState<UserData | null>(null);
  const [editingEmoji, setEditingEmoji] = useState(false); // State to toggle emoji editing
  const emojiMenuRef = useRef<HTMLDivElement>(null); // Reference to the emoji menu container

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await UserService.getUser(usernameLink);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [usernameLink]);

  const handleEmojiClick = () => {
    if (username === usernameLink) {
      setEditingEmoji(true);
    }
  };

  const handleEmojiChange = async (newEmoji: string) => {
    setUser(prevUser => ({
      ...prevUser!,
      emoji: newEmoji
    }));
    const emojiChangeData: EmojiChange = {
      token: authTokens?.access,
      username : username,
      emoji: newEmoji
    };
    const response = await UserService.changeEmoji(emojiChangeData)
    if (response === "ok"){
      setEditingEmoji(false);
    }
    // Here you can send a request to update the user's emoji in the backend
  };

  // Close emoji menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiMenuRef.current &&
        !emojiMenuRef.current.contains(event.target as Node)
      ) {
        setEditingEmoji(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="user-page-container">
      {user && (
        <>
          <div className="user-emoji-container">
            <div className="user-emoji" onClick={handleEmojiClick} ref={emojiMenuRef}>
              {editingEmoji ? (
                <EmojiMenu selectedEmoji={user.emoji} onEmojiSelect={handleEmojiChange} />
              ) : (
                user.emoji
              )}
            </div>
          </div>
          <div className="text-infos">
            <h1 className="user-name">@{user.username}</h1>
            <p className="user-description">{user.description}</p>
          </div>
          {username === usernameLink && (
                <button type="button" onClick={logoutUser}>Logout</button>
              )}
        </>
      )}
    </div>
  );
};

interface EmojiMenuProps {
  selectedEmoji: string;
  onEmojiSelect: (emoji: string) => void;
}

const EmojiMenu: React.FC<EmojiMenuProps> = ({ selectedEmoji, onEmojiSelect }) => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji);
    setOpen(false);
  };

  return (
    <div className={`emoji-menu ${open ? 'open' : ''}`}>
      <div className="selected-emoji" onClick={toggleMenu}>
        {selectedEmoji}
      </div>
      <div className="emoji-list">
        {emojis.map(emoji => (
          <div key={emoji} className="emoji-item" onClick={() => handleEmojiClick(emoji)}>
            {emoji}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
