import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAccComponent } from './acc-management/create-acc/create-acc.component';
import { EditAccComponent } from './acc-management/edit-acc/edit-acc.component';
import { ListAccComponent } from './acc-management/list-acc/list-acc.component';
import { ManageAccountComponent } from './acc-management/manage-acc/manage-acc.component';
import { ForgotPassComponent } from './authentication/forgot-pass/forgot-pass.component';
import { AdminGuard } from './authentication/guard/admin.guard';
import { AuthGuard } from './authentication/guard/auth.guard';
import { CashierGuard } from './authentication/guard/cashier.guard';
import { CustomerGuard } from './authentication/guard/customer.guard';
import { OwnerGuard } from './authentication/guard/owner.guard';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { CashManagementComponent } from './bussiness-management/cash-management/cash-management.component';
import { CreatePaymentVoucherComponent } from './bussiness-management/create-payment-voucher/create-payment-voucher.component';
import { InfrastructureManagementComponent } from './bussiness-management/infrastructure-management/infrastructure-management.component';
import { ReportLossProfitComponent } from './bussiness-management/report-loss-profit/report-loss-profit.component';
import { CashierScreenComponent } from './cashier/cashier-screen/cashier-screen.component';
import { CartComponent } from './customer/cart/cart.component';
import { CategoryComponent } from './customer/category/category.component';
import { DishDetailComponent } from './customer/dish-detail/dish-detail.component';
import { HomePageComponent } from './customer/home-page/home-page.component';
import { MenuComponent } from './customer/menu/menu.component';
import { PaymentComponent } from './customer/payment/payment.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { ListEmployeeComponent } from './employee/list-employee/list-employee.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { ReportUserComponent } from './report/report-user/report-user.component';
import { SwaggerComponent } from './server-management/swagger/swagger.component';
import { ErrorComponent } from './share/error/error.component';
import { HomeComponent } from './share/home/home.component';

const routes: Routes = [
  { path: "dang-nhap", component: LoginComponent },
  { path: "quen-mk", component: ForgotPassComponent },
  { path: "dang-ki", component: RegisterComponent },
  { path: "", redirectTo: "dang-nhap", pathMatch: "full" },
  {
    path: "home", component: HomeComponent, canActivate: [AuthGuard], children:
      [
        { path: "trang-chu", component: HomePageComponent, canActivate: [CustomerGuard] },
        { path: "loai-san-pham", component: CategoryComponent, canActivate: [CustomerGuard] },
        { path: "thuc-don", component: MenuComponent, canActivate: [CustomerGuard] },
        { path: "thuc-don/:id", component: DishDetailComponent, canActivate: [CustomerGuard] },
        { path: "gio-hang", component: CartComponent, canActivate: [CustomerGuard] },
        { path: "thanh-toan", component: PaymentComponent, canActivate: [CustomerGuard] },

        { path: "thu-ngan", component: CashierScreenComponent, canActivate: [CashierGuard] },

        { path: "swagger", component: SwaggerComponent, canActivate: [AdminGuard] },

        { path: "tao-phieu-chi", component: CreatePaymentVoucherComponent, canActivate: [OwnerGuard] },
        { path: "quan-ly-tien-mat", component: CashManagementComponent, canActivate: [OwnerGuard] },
        { path: "bao-cao-lo-lai", component: ReportLossProfitComponent, canActivate: [OwnerGuard] },
        { path: "quan-ly-co-so-vat-chat", component: InfrastructureManagementComponent, canActivate: [OwnerGuard] },

        { path: "danh-sach-tai-khoan", component: ListAccComponent, canActivate: [AdminGuard] },
        { path: "sua-tai-khoan/:username", component: EditAccComponent, canActivate: [AdminGuard] },
        { path: "quan-ly-tai-khoan", component: ManageAccountComponent },

        { path: "bao-cao-nguoi-dung", component: ReportUserComponent, canActivate: [OwnerGuard] },

        { path: "them-nhan-vien", component: AddEmployeeComponent, canActivate: [OwnerGuard] },
        { path: "danh-sach-nhan-vien", component: ListEmployeeComponent, canActivate: [OwnerGuard] },
        { path: "sua-nhan-vien/:id", component: EditEmployeeComponent, canActivate: [OwnerGuard] },
        {
          path: "san-pham", component: ListProductComponent, canActivate: [OwnerGuard], children:
            [
              { path: "them-san-pham", component: AddProductComponent, canActivate: [OwnerGuard] }
            ]
        }
        ,
        { path: "access-denied", component: ErrorComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
