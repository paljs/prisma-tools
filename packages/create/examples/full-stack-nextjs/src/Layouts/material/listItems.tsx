import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CommentIcon from '@material-ui/icons/Comment';
import SettingsIcon from '@material-ui/icons/Settings';
import ForumIcon from '@material-ui/icons/Forum';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import { useRouter } from 'next/router';

export const MainListItems: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" onClick={() => router.push('/admin')} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Users" onClick={() => router.push('/admin/models/User')} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ForumIcon />
        </ListItemIcon>
        <ListItemText primary="Posts" onClick={() => router.push('/admin/models/Post')} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <CommentIcon />
        </ListItemIcon>
        <ListItemText primary="Comments" onClick={() => router.push('/admin/models/Comment')} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Groups" onClick={() => router.push('/admin/models/Group')} />
      </ListItem>
    </div>
  );
};
