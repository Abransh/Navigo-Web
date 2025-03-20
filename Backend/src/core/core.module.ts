// src/core/core.module.ts
import { Global, Module } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Global()
@Module({
  providers: [Reflector],
  exports: [Reflector],
})
export class CoreModule {}