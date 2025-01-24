/* @license Enterprise */

import { CanActivate, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';

import {
  AuthException,
  AuthExceptionCode,
} from 'src/engine/core-modules/auth/auth.exception';
import { EnvironmentService } from 'src/engine/core-modules/environment/environment.service';

@Injectable()
export class SSOProviderEnabledGuard implements CanActivate {
  constructor(private readonly environmentService: EnvironmentService) {}

  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
