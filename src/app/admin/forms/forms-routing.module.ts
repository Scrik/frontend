/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminFormListComponent } from './form-list.component';
import { AdminFormBuilderComponent } from './form-builder.component';
import { AdminFormDetailsComponent } from './form-details.component';
import { AppRoutes } from '../../core/models/app-routes.model';

@NgModule({
  imports: [
    RouterModule.forChild(<AppRoutes>[{
      path: '',
      component: AdminFormListComponent,
      breadcrumbIgnore: true
    }, {
      path: 'create',
      component: AdminFormBuilderComponent,
      breadcrumb: 'T_ACTION_CREATE',
    }, {
      path: ':id',
      component: AdminFormDetailsComponent,
      breadcrumb: 'T_FORM_DETAILS',
    }, {
      path: ':id/edit',
      component: AdminFormBuilderComponent,
      breadcrumb: 'T_ACTION_EDIT',
    }])
  ],
  exports: [RouterModule]
})
export class AdminFormsRoutingModule {
}
