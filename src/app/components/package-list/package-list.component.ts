import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Package } from '../../models/interface';

@Component({
  selector: 'app-package-list',
  standalone: true,
  imports: [],
  templateUrl: './package-list.component.html',
  styleUrl: './package-list.component.scss'
})
export class PackageListComponent {
  constructor() {
    this.loadPackages();
  }
  private packageService = inject(ApiService);
  packages = signal<Package[]>([]);

  loadPackages() {
    this.packageService.getPackages().subscribe(res => {
      this.packages.set(res);
      console.log(res)
    });
  }

}
