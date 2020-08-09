import React, {useContext} from 'react';
import TabContext from '../../Contexts/TabContext'
import Create from './Create/Create'
import TabPanel from '../Nav/TabPanel/TabPanel'


function Home() {
    const {tabValue} = useContext(TabContext);
  

    return (
        <>
            <TabPanel value={tabValue} index={0}>
                <Create/>        
            </TabPanel>
        </>
    );
}

export default Home;
