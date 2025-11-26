import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NominatimService} from '../../services/NominatimService';

@Component({
  selector: 'app-search-bar',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar implements OnInit {

  searchForm!: FormGroup;

  constructor(private nominatimService: NominatimService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
        searchBar: [null, Validators.required]
      },
      {
        updateOn: 'change',
      });
  }

  onSubmitForm(): void {
    this.nominatimService.searchPossibleCities(this.searchForm.controls['searchBar'].value);
  }
}
