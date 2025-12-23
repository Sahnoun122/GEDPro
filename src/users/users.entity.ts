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
    eamil: string;

    @Column({type : 'enum',
        enum : Role
    })

    role: Role;

    @Column({default : true })
    is_active : boolean;

    @CreateDateColumn()
    created_at : Date;
}