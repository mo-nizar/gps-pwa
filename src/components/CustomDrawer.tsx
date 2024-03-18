import * as React from 'react';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Drawer from '@mui/joy/Drawer';
import Logo from "@images/logo.png";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

import '@styles/components/CustomDrawer.scss';

import List from '@mui/joy/List';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import ModalClose from '@mui/joy/ModalClose';
import Menu from '@mui/icons-material/Menu';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PrimaryButton } from './CustomButtons';

interface Option {
  id: number | string;
  label: string;
  link?: string;
}

interface CustomDrawerProps {
  options?: {
    type: string;
    label: string;
    link?: string;
    optionsList: Option[];
  }[];
}

export default function CustomDrawer({ options }: CustomDrawerProps) {
  const [open, setOpen] = React.useState(false);

  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth' // Optionally, you can use smooth scrolling effect
    });
    setOpen(false);
  }

  return (
    <div className='CustomDrawer'>
      <IconButton style={{ padding: 0 }} variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        <Menu style={{ fill: 'white', width: 20, height: 20 }} />
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            ml: 'auto',
            mt: 1,
            mr: 2,
          }}
        >
          <Typography
            component="label"
            htmlFor="close-icon"
            fontSize="sm"
            fontWeight="lg"
            sx={{ cursor: 'pointer' }}
          >
          </Typography>
          <ModalClose id="close-icon" sx={{ position: 'initial' }} />
        </Box>
        <Image className='self-center' src={Logo} width={150} alt={""} />

        <List
          size="lg"
          component="nav"
          sx={{
            flex: 'none',
            fontSize: 'xl',
            '& > div': { justifyContent: 'center' },
          }}
        >
          {options?.map((item, idx) => {

            if (item.type === 'dropdown') {

              return (
                <Accordion className='accordion' key={idx}>
                  <AccordionSummary
                    className='accordionSummary'
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel-content"
                    id="panel-header"
                  >
                    {item.label}
                  </AccordionSummary>
                  <AccordionDetails className='accordionDetails'>
                    {item.optionsList.map((obj, id) =>
                      (<ListItemButton className='accordionButton' key={id}>
                        <a onClick={() => handleNavigation(`${obj.link}/?key=${obj.id}` as string)} key={obj.id}>
                          <span>{obj.label}</span>
                        </a>
                      </ListItemButton>
                      )
                    )}

                    <ListItemButton>
                      <a key={2222} onClick={() => handleNavigation(item.link as string)} className="viewAll-accordion">
                        <span>
                          {"View all"}
                        </span>
                        <img src="/icons/long-arrow-right.svg" alt="long-arrow-right" />

                      </a>
                    </ListItemButton>

                  </AccordionDetails>
                </Accordion>
              )
            }
            return null;
          })}
        </List>
        <PrimaryButton className='drawer-button' label={'Request a call'} onClick={scrollToBottom} />
      </Drawer>
    </div>
  );
}
