import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ComparableService } from "../services/comparable.service"
import { MatTableDataSource } from '@angular/material/table'
import { createComparableRequest } from '../interfaces/comparable';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-create-comparable',
  templateUrl: './create-comparable.component.html',
  styleUrls: ['./create-comparable.component.scss']
})
export class CreateComparableComponent implements OnInit {

  selectedImage: string = '';
  selectedName: string = '';
  selectedValue: string = '';
  selectedVariableName: any
  selectedVariableValue: any
  modalOpen: boolean = false;
  imageUrl: string = '';
  lista: string[] = [];
  lessonForm:any;
  showSearchResults: boolean = true;
  searchInput: FormControl = new FormControl('');
  base64Image:any;
  loading: boolean = false;

  noMatchesFound: boolean = false;
  searchResults: any[] = [];
  createComparableForm!: FormGroup
  dataSourcePacks!: MatTableDataSource<any>;
  displayedColumns = ["name", "value", "Action"]

  name = new FormControl('')
  value = new FormControl('')

  variableSuccess!: Boolean;
  messagesError: Message[] = [];
  messagesSuccess: Message[] = [];

  constructor(private _fb: FormBuilder,
    private cd: ChangeDetectorRef, private comparableService: ComparableService) {

  }

  ngOnInit(): void {
    this.createComparableForm = this._fb.group({
      comparableName: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      name: this.name,
      value: this.value,
      body: this._fb.array([])
    });
    this.addVariable()

    const comparableCreateMessage = localStorage.getItem('comparableCreateMessage');
    if (comparableCreateMessage) {
      this.variableSuccess = true;
      this.messagesSuccess = [
        { severity: 'success', summary: comparableCreateMessage }
      ];
      setTimeout(() => {
        this.messagesSuccess = []
      }, 2500);
      localStorage.removeItem('comparableCreateMessage');
    };

    const comparableUpdateMessage = localStorage.getItem('comparableUpdateMessage');
    if (comparableUpdateMessage) {
      this.variableSuccess = true;
      this.messagesSuccess = [
        { severity: 'success', summary: comparableUpdateMessage}
      ];
      setTimeout(() => {
        this.messagesSuccess = []
      }, 2500);
      localStorage.removeItem('comparableUpdateMessage');
    };
  };

  get body() {
    return this.createComparableForm.controls["body"] as FormArray;
  };

  addVariable(): void {

    const lessonForm = this._fb.group({
      name: [''],
      value: ['']
    });


    this.body.push(lessonForm);
    this.dataSourcePacks = new MatTableDataSource(this.body.controls);

    this.cd.detectChanges();
  };


  deleteVariable(lessonIndex: number): void {
    if(lessonIndex != 0){
      this.body.removeAt(lessonIndex);
      this.dataSourcePacks = new MatTableDataSource(this.body.controls);
    }else{
      return;
  }
  };

    /* Cifrado de url image */
  handleImageInput(event: any) {
      if (event.target && event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
    
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const base64Image = e.target.result;
          this.base64Image = base64Image 
        };
    
        reader.readAsDataURL(file);
      }
  };
    
  
  onSubmit() {
    
    const data : createComparableRequest =
    {
      type: 50,
      params: {
        name: this.createComparableForm.value.comparableName,
        image: this.base64Image,
        body: this.body.value
      }
    };
    this.comparableService.createComparable(data).subscribe(response => {
      if (response.statusCode === 200) {
        this.loading = true;
        setTimeout(() => {
          location.reload();
        }, 2000);
        localStorage.setItem('comparableCreateMessage', 'Comparable Created');          
      } else {
        this.loading = true;
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
      
    });
  }



  searchComparable(nameComparable: string) {
    if (nameComparable.trim() === '') {
      this.searchResults = [];
      this.noMatchesFound = false;
      return
    }

    const data = {
      type: 51,
      params: {
        name: nameComparable
      }
    };

    this.comparableService.searchComparable(data).subscribe((response: any) => {
      console.log(response);
      this.searchResults = response.body;
      if (response.statusCode === 400) {
        this.noMatchesFound = true;
      } else {
        this.noMatchesFound = false;
      }
    });
  }

  selectResult(result: any) {
    console.log('Resultado seleccionado:', result);

    this.selectedImage = result.image;
    this.selectedName = result.name;
    this.imageUrl = this.selectedImage;


    const body = result.body;
    if (body && body.length > 0) {
      this.body.clear();

      body.forEach((variable: any) => {
        const group = this._fb.group({
          name: [variable.name, Validators.required],
          value: [variable.value, Validators.required]
        });
        this.body.push(group);
      });

      this.dataSourcePacks = new MatTableDataSource(this.body.controls);
      this.cd.detectChanges();
    }

    this.showSearchResults = true;
  }

  updateComparable() {
    const data = {
      type: 53,
      params:
      {
        name: this.searchResults[0].name,
        image: this.base64Image,
        comparable_id: this.searchResults[0].comparable_id,
        body: this.body.value
      }
    }
    this.comparableService.updateComparable(data).subscribe(response => {
      if (response.statusCode === 200) {
        this.loading = true;
        setTimeout(() => {
          location.reload();
        }, 2000);
        localStorage.setItem('comparableUpdateMessage', 'Comparable Updated');          
      } else {
        this.loading = true;
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    })
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.loadImage(file);
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  onDrop(event: any) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    this.loadImage(file);
  }

  loadImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }


  removeImage() {
    this.imageUrl = '';
  }

  resetForm(formulario: FormGroup) {
    formulario.get('comparableName')?.reset();
  }

}






