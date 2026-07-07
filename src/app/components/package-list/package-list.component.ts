import { Component, computed, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Package } from '../../models/interface';
import { FormatToKPipe } from "../../pipes/format-to-k.pipe";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-package-list',
  standalone: true,
  imports: [FormatToKPipe],
  templateUrl: './package-list.component.html',
  styleUrl: './package-list.component.scss'
})
export class PackageListComponent {
  constructor() {
    this.loadPackages();
  }
  private packageService = inject(ApiService);
  private sub = new Subscription();
  packages = signal<Package[]>([]);
  searchString = signal<string>('');
  hoveredPackageId = signal<string | null>(null);
  activeDependencies = signal<Set<string>>(new Set());

  filteredPackages = computed(() => {
    const query = this.searchString().toLowerCase();
    return this.packages().filter(pkg => 
      pkg.id.toLowerCase().includes(query)
    );
  });
  
 
  loadPackages() {
    this.sub.add(
      this.packageService.getPackages().subscribe(res => {
        this.packages.set(res);
      })
    );
  }
   onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchString.set(inputElement.value);
  }

  onHover(pkgId: string) {
    this.hoveredPackageId.set(pkgId);
    
    this.packageService.getDependencies(pkgId).subscribe(deps => {
      if (this.hoveredPackageId() === pkgId) {
        this.activeDependencies.set(new Set(deps));
      }
    });
  }

  splitName(id: string): { scope: string, name: string } | null {
    if (id.includes('/')) {
      const parts = id.split('/');
      return { scope: parts[0] + '/', name: parts[1] };
    }
    return null;
  }

  onLeave() {
    this.hoveredPackageId.set(null);
    this.activeDependencies.set(new Set());
  }

  ngOnDestroy() {
   this.sub.unsubscribe();
  }

}
