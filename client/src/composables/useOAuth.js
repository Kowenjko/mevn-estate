import {
	GoogleAuthProvider,
	GithubAuthProvider,
	OAuthProvider,
	signInWithPopup,
	getAuth,
} from 'firebase/auth'

export const useOAuth = () => {
	const getOAuthProviderIds = () => {
		return {
			google: GoogleAuthProvider.PROVIDER_ID,
			github: GithubAuthProvider.PROVIDER_ID,
			microsoft: 'microsoft.com',
		}
	}

	const getOAuthProvider = (providerId) => {
		const OAUTH_PROVIDER_IDS = getOAuthProviderIds()

		switch (providerId) {
			case OAUTH_PROVIDER_IDS.google:
				return new GoogleAuthProvider()
			case OAUTH_PROVIDER_IDS.github:
				return new GithubAuthProvider()

			case OAUTH_PROVIDER_IDS.microsoft:
				return new OAuthProvider('microsoft.com')
			default:
				throw new Error(`No provider implemented for ${providerId}`)
		}
	}

	const getDataProvider = (providerId, result) => {
		const OAUTH_PROVIDER_IDS = getOAuthProviderIds()

		switch (providerId) {
			case OAUTH_PROVIDER_IDS.google:
				const { displayName, email, photoURL } = result.user
				return { name: displayName, email, photo: photoURL }
			case OAUTH_PROVIDER_IDS.github:
				const name = result.user.reloadUserInfo.screenName || null
				const emailGithub =
					String(name).split(' ').join('').toLowerCase() + '@github.com'
				const avatar =
					result.user.providerData[0].photoURL ||
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcU50X1UOeDaphmUyD6T8ROKs-HjeirpOoapiWbC9cLAqewFy1gthrgUTB9E7nKjRwOVk&usqp=CAU'
				return { name, email: emailGithub, photo: avatar }

			case OAUTH_PROVIDER_IDS.microsoft:
				const { displayName: nameMicrosoft } = result.user
				const emailMicrosoft =
					nameMicrosoft.split(' ').join('').toLowerCase() + '@microsoft.com'
				const photoUrl =
					result.user.providerData[0].photoURL ||
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcU50X1UOeDaphmUyD6T8ROKs-HjeirpOoapiWbC9cLAqewFy1gthrgUTB9E7nKjRwOVk&usqp=CAU'
				return {
					name: nameMicrosoft,
					email: emailMicrosoft,
					photo: photoUrl,
				}
			default:
				return {}
		}
	}

	return { getOAuthProviderIds, getOAuthProvider, getDataProvider }
}
