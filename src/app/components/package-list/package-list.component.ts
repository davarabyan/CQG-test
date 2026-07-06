import { Component, computed, inject, signal } from '@angular/core';
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
  searchString = signal<string>('');

  filteredPackages = computed(() => {
    const query = this.searchString().toLowerCase();
    return this.packages().filter(pkg => 
      pkg.id.toLowerCase().includes(query)
    );
  });
  
  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchString.set(inputElement.value);
    console.log("sdsd")
  }
  loadPackages() {
    
    this.packageService.getPackages().subscribe(res => {
      this.packages.set(res);
      console.log(res)
    });
  }

}
