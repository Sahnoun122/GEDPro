import { Entity , Column , PrimaryGeneratedColumn , CreateDateColumn } from "typeorm";


export enum Role{
    amin_rh = 'admin_rh',
    rh= 'rh',
    manager = 'manager'
}

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    organisation_id : string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({unique : true})
    email: string;

    @Column({type : 'enum',
        enum : Role
    })

    @Column()
     password : string

    role: Role;

    @Column({default : true })
    is_active : boolean;

    @CreateDateColumn()
    created_at : Date;
}