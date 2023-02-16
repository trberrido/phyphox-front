import React from 'react';

import {Title} from '../components/title.jsx';
import List from '../components/list.jsx';

class PagePreviousXPs extends React.Component {
	render(){
		return(<>
			<Title header='Search, see, download' content='Previous experiments'/>
			<List
				collection='experiments' 
				actionName='See graph'
				actionURL='/experiment/'
				isDownloadable={true}
			/>
		</>);
	}
}

export default PagePreviousXPs;