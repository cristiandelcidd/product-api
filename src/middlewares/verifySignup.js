import { ROLES } from '../models/Role';
import User from '../models/User';

export const verifyDuplicateUsernameOrEmail = async ( req, res, next ) => {
    const { username, email } = req.body;
    const user = await User.findOne( { username } );
    if ( user ) return res.status( 400 ).json( { message: 'The user already exists' } );

    const userEmail = await User.findOne( { email } );
    if ( userEmail ) return res.status( 400 ).json( { message: 'The email already exists' } );

    next();
};

export const checkRolesExisted = ( req, res, next ) => {
    const { roles } = req.body;
    if ( roles ) {
        for (let i = 0; i < roles.length; i++) {
            if ( !ROLES.includes( roles[ i ] ) ) {
                return res.status( 400 ).json({
                    message: `Role ${ roles[ i ] }, is not a valid role`
                });
            }
        }
    }
    next();
};