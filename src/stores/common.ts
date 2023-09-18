import { atom } from 'recoil'

interface CommonData {
	token: string
	mingleCode: string
	order: string
}

export const common = atom({
	key: 'common',
	default: {
		token: '',
		mingleCode: '/GN62eV1c4Q78ghWNMWRsQ==',
		order: 'distance',
	} as CommonData,
})
