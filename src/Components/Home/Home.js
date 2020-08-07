import React, {useContext} from 'react';
import CreateDrawer from './CreateDrawer/CreateDrawer';
import CanvasContainer from './CanvasContainer/CanvasContainer'
import TabContext from '../../Contexts/TabContext'
import Canvas from '../../Components/Canvas/Canvas'
import Box from '@material-ui/core/Box'
import TabPanel from '../Nav/TabPanel/TabPanel'
import Spinner from './Spinner/Spinner'
import ViewportContext from '../../Contexts/ViewportContext'
import CreatePanels from './CreatePanels/CreatePanels'

function Home() {
    const {tabValue} = useContext(TabContext);
    const viewportWidth = useContext(ViewportContext);

    return (
        <>
            <TabPanel value={tabValue} index={0}>
              {viewportWidth >= 600 && <CreateDrawer/>}
              <Box flexGrow={1} display='flex' height='100%' width='100%' flexDirection='column' justifyContent='center'>
                <CanvasContainer>
                  <Canvas/>
                  <Spinner/>
                </CanvasContainer>
              </Box> 
              {viewportWidth < 600 && <CreatePanels/>}
            </TabPanel>
              <TabPanel value={tabValue} index={1}>
            </TabPanel>
        </>
    );
}

export default Home;
