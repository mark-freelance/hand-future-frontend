import RootLayout from '~/components/layouts/RootLayout'
import { AddAdmin } from '~/components/specs/admin/AddAdmin'
import { InitHeroes } from '~/components/specs/admin/InitHeroes'
import { JumpToHeroCard } from '~/components/specs/admin/JumpToHeroCard'
import { UpdateHeroAvatars } from "~/components/specs/admin/UpdateHeroAvatars";


export const AddAdminPage = () => {
	
	
	return (
		<RootLayout>
			<div className={'flex flex-col gap-8'}>
				
				<AddAdmin/>
				
				<InitHeroes/>
				
				<JumpToHeroCard/>
				
				<UpdateHeroAvatars />
			</div>
		</RootLayout>
	)
}

export default AddAdminPage
