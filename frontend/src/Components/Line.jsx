import React from 'react'
import Name from './Name'

const Line = (name, spoke) => {
	return(
		<div>
			<Name name={name}/>
			<pre>{spoke}</pre>
		</div>
	)
}

export default Line