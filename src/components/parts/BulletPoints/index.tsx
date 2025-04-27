import { List, ListItem, ListItemText } from "@mui/material";

type Props = {
  items: string[];
};

const BulletPoints = ({ items }: Props) => {
  return (
    <List component="ul" disablePadding sx={{ pl: 2, listStyleType: "disc" }}>
      {items.map((item, index) => (
        <ListItem
          key={index}
          component="li"
          disableGutters
          sx={{ display: "list-item", py: 0.2, px: 0 }}
        >
          <ListItemText
            primary={item}
            slotProps={{
              primary: {
                variant: "body2",
                sx: { my: 0 },
              },
            }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default BulletPoints;
