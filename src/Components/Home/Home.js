import React, {useContext} from 'react';
import CreateDrawer from './CreateDrawer/CreateDrawer';
import CanvasContainer from './CanvasContainer/CanvasContainer'
import TabContext from '../../Contexts/TabContext'
import Canvas from '../../Components/Canvas/Canvas'
import Box from '@material-ui/core/Box'
import TabPanel from '../Nav/TabPanel/TabPanel'
import Spinner from './Spinner/Spinner'
import CreatePanels from './CreatePanels/CreatePanels'
import useMediaQuery from '@material-ui/core/useMediaQuery';

function Home() {
    const {tabValue} = useContext(TabContext);
    const matches = useMediaQuery('(min-width:600px)');

    return (
        <>
            <TabPanel value={tabValue} index={0}>
              {matches && <CreateDrawer/>}
              <Box flexGrow={1} display='flex' height='100%' width='100%' flexDirection='column' justifyContent='center'>
                <CanvasContainer>
                  <Canvas/>
                  <Spinner/>
                </CanvasContainer>
              </Box> 
              {!matches && <CreatePanels/>}
            </TabPanel>
              <TabPanel value={tabValue} index={1}>
            </TabPanel>
        </>
    );
}

export default Home;
