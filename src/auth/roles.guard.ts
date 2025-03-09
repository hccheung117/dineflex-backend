import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { User, UserRole } from "./user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.get<UserRole[]>('roles', context.getHandler());
		if (!requiredRoles) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const user: User = request.user;

		console.log(user);

		if (!user) {
			throw new ForbiddenException('You must be logged in.')
		}
		if (!requiredRoles.includes(user.role)) {
			throw new ForbiddenException('You do not have permission to access this resource.');
		}

		return true;
	}
}
