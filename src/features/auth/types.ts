export interface User {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	status: string;
	storeId: number;
	url?: string;
	onboardingStatus?: OnboardingStatus;
	role: UserType;
}

export enum UserType {
	Admin = 'ADMIN',
	Client = 'CLIENT'
}

export enum OnboardingStatus {
	Done = 'DONE'
}

export interface Token {
	accessToken: string;
	refreshToken: string;
	clientToken: string;
}

export interface Access {
	store_id: number;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface GetStoreRequest {
	storeId?: number;
}

export interface StoreResponse {
	store: {
		onboarding_procedure: {
			onboarding_status: OnboardingStatus;
		};
	};
}

export interface AuthResponse {
	tokens: Token;
	user: User;
	view: {
		type: UserType;
	};
	accesses: Access[];
}

export interface AuthState {
	user: User | null;
	tokens: Token | null;
	isAuthenticated: boolean;
}
