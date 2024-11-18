import Link from 'next/link'

import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

export const JumpToHeroCard = () => {
	return (
		<Card>
			
			<CardHeader>
				<CardTitle>嘉宾卡片</CardTitle>
			</CardHeader>
			<CardContent>
				<Link href={'/admin/hero-card'}><Button>嘉宾卡片</Button></Link>
			</CardContent>
		
		</Card>
	)
}
