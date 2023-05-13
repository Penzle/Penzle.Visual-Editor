import { Util } from '../utilities/util';

export class AuthService {
	static isLoggedIn(): boolean {
		const token = this.getAccessToken();
		return !!token;
	}

	static getAccessToken(): string | null {
		const token = localStorage.getItem('access_token');
		if (token) {
			return token;
		}
		return Util.getUrlParameter('token');
	}
}
