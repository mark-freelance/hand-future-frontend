import MDialog from '../base_components/MDialog'
import ProfileCore from './ProfileCore'
import React from 'react'

export const ProfileDialog = () => <MDialog
  trigger={'Profile'}
  title={'编辑资料'}
  content={<ProfileCore/>}
/>

export default ProfileDialog
