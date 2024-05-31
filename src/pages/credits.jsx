import React from 'react';

import { Title } from '../components/title';

import './credits.css';
import Spacer from '../components/spacer';

const PageCredits = () => {
	return(
		<div className='text-content'>
			<Title
				header='english'
				content='Credits' />
			<Spacer size='xxsmall'/>
			<p>
				This project was designed by the <a href='https://www.physicsreimagined.com' target='_blank' rel='noreferrer'>“Physics Reimagined”</a> team (LPS, Univ. Paris-Saclay and CNRS). See www.physicsreimagined.com
			</p>
			<p>
				The web application was designed and developed by <a target='_blank' rel='noreferrer' href='https://dafox.co/en'>da fox</a>.
			</p>
			<p>
				This project is free and can be modified (CC BY license).
			</p>
			<p>
				The project benefited from the support of the “La Physique Autrement” Chair of the Paris-Saclay foundation supported by the Air Liquide group and Crédit Agricole – CIB. Many thanks to the Center for Educational Experimentation of the Villebon Institute – Georges Charpak for its welcome.
			</p>
			<p>
				<address>
					Contact: <a href="mailto:laphysiqueautrement@gmail.com">laphysiqueautrement@gmail.com</a>
				</address>
			</p>

			<Spacer />

			<div lang='fr'>
				<Title
					header='français'
					content='Crédits' />
				<Spacer size='xxsmall'/>
				<p>
				Ce projet a été conçu par l'équipe <a href='http://www.vulgarisation.fr' target='_blank' rel='noreferrer'>"La physique Autrement"</a> (LPS, Univ. Paris-Saclay et CNRS)
				</p>
				<p>
					L'application Web a été conçue et développée par <a target='_blank' rel='noreferrer' href='https://dafox.co'>da fox</a>.
				</p>
				<p>
					Ce projet est libre et peut être modifié (licence CC BY).
				</p>
				<p>
				Le projet a bénéficié du soutien de la Chaire « La Physique Autrement » de la fondation Paris-Saclay soutenue par le groupe Air Liquide et le Crédit Agricole – CIB. Merci au Centre d’Expérimentation Pédagogique de l’Institut Villebon – Georges Charpak pour son accueil.
				</p>
				<p>
					<address>
						Contact: <a href="mailto:laphysiqueautrement@gmail.com">laphysiqueautrement@gmail.com</a>
					</address>
				</p>
			</div>
		</div>
	);
}

export default PageCredits;